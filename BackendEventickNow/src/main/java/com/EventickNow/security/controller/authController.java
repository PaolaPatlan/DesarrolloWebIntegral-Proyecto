package com.EventickNow.security.controller;



import java.util.Optional;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EventickNow.model.dto.Mensaje;
import com.EventickNow.security.dto.JwtDto;
import com.EventickNow.security.dto.LoginUsuario;
import com.EventickNow.security.dto.NuevoUsuario;
import com.EventickNow.security.entity.UsuarioEntity;
import com.EventickNow.security.jwt.JwtProvider;
import com.EventickNow.security.service.RolService;
import com.EventickNow.security.service.UsuarioService;


@RestController
@RequestMapping("/auth")
@CrossOrigin
public class authController {
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	RolService rolService;
	
	@Autowired
	JwtProvider jwtProvider;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@PostMapping("/nuevo")
	public ResponseEntity<?> nuevo(@Valid @RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult) throws MessagingException{
		if(bindingResult.hasErrors())
			return new ResponseEntity(new Mensaje("Campos incorrectos"), HttpStatus.BAD_REQUEST);
		if(usuarioService.existsByCorreoE(nuevoUsuario.getCorreoElectronico()))
			return new ResponseEntity(new Mensaje("Ese email ya existe"), HttpStatus.BAD_REQUEST);
		UsuarioEntity usuario = new UsuarioEntity(nuevoUsuario.getNombre(), nuevoUsuario.getApellidoMaterno() 
				, nuevoUsuario.getApellidoPaterno(), nuevoUsuario.getCorreoElectronico(), 
				passwordEncoder.encode(nuevoUsuario.getPassword()),nuevoUsuario.getRoles());
		usuario.setEstatus(0);
		
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		helper.setTo(usuario.getCorreoElectronico());
		helper.setSubject("Confirmación de registro");
		String htmlContent = "<html><body>" + "<p>Hola "+usuario.getNombre() + ",</p>"
				+ "<p>Gracias por registrarte en EventickNow. Para confirmar tu registro, haz clic en siguiente botón:</p>"
				+ "<a href='http://localhost:8080/auth/confirmar/" + usuario.getCorreoElectronico()
				+ "'><button style='background-color: white; color:#8437D3; padding: 10px; border-radius: 25px; border-color: #8437D3; border-width: 1px;'>Confirmar registro</button></a>"
				+ "<p>Saludos,<br>El equipo de EventickNow</p>" + "</body></html>";
		helper.setText(htmlContent, true);
		javaMailSender.send(message);

		/*roles.add(rolService.getByRolNombre(RolNombre.ROLE_USUARIO).get());
        if(nuevoUsuario.getRoles().contains("creador"))
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_CREADOR).get());
        if(nuevoUsuario.getRoles().contains("admin"))
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());*/
        usuario.setRoles(nuevoUsuario.getRoles());
		usuarioService.save(usuario);
		return new ResponseEntity(new Mensaje("Usuario guardado"), HttpStatus.CREATED);
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUsuario loginUsario, BindingResult bindingResult){
		Optional<UsuarioEntity>  usuario = Optional.empty();
		usuario = usuarioService.getByCorreoEs(loginUsario.getCorreoElectronico());
		
		if(usuarioService.existsByCorreoE(loginUsario.getCorreoElectronico())){
			
			
			if (usuario.get().getEstatus() == 0) {
				return new ResponseEntity(new Mensaje("Debes validar tu registro"), HttpStatus.BAD_REQUEST);
			}
			
		}
		
		if(bindingResult.hasErrors())
			return new ResponseEntity(new Mensaje("Email o contraseña incorrectos"), HttpStatus.BAD_REQUEST);
		Authentication authentication = 
				authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUsario.getCorreoElectronico(), loginUsario.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.genereteToken(authentication);
		UserDetails userDetails = (UserDetails)authentication.getPrincipal();
		JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(),usuario.get().getIdUsuario(), userDetails.getAuthorities()); 
		
		return new ResponseEntity(jwtDto, HttpStatus.OK);
	}
	
	
	@GetMapping(path = "/confirmar/{correo}")
    public ResponseEntity<Void> confirmRegistration(@PathVariable("correo") String correo) {
		usuarioService.getByCorreoE(correo);
        return ResponseEntity.ok().build();
    }
	
}
