package com.example.login.controller;

import com.example.login.entity.AuthRequest;
import com.example.login.entity.User;
import com.example.login.exception.UserNotFoundException;
import com.example.login.service.UserServices;
import com.example.login.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UserRestController {

//    @Autowired
//    UserServices userServices;

    @Autowired
    AuthenticationManager authenticate;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserServices userServices;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/")
    public String welcome() {
        return "Welcome to cứt cứt !!";
    }
    @GetMapping("/list")
    public List<User> getList(){
        return userServices.getListUser();
    }

    @PostMapping("/user")
    public String generateToken(@Valid @RequestBody AuthRequest user) throws Exception {
        try{
            User u = userServices.getUserById(user.userName).orElseThrow(() -> new UserNotFoundException("Khong tim thay user "+user.userName));
            authenticate.authenticate(
                    new UsernamePasswordAuthenticationToken(u.getUname(), u.getPasswd())
            );
        }catch (Exception ex){
            return "not";
        }
        return jwtUtil.generateToken(user.userName);
    }

    @GetMapping("/getuser")
    public ResponseEntity<User> getUserById(@RequestParam String username) throws Exception {
        Optional<User> u = null;
        try {
            u = Optional.ofNullable(userServices.getUserById(username).orElseThrow(() -> new UserNotFoundException("Khong tim thay user "+username)));
        }catch (Exception e){
            return new ResponseEntity(u,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(u,HttpStatus.OK);
    }

    @PostMapping("/new")
    public HttpStatus createUser(@RequestBody User user){
        if(userServices.existsUser(user.getUname())){
            return HttpStatus.BAD_REQUEST;
        }
        else{
            userServices.saveUser(user);
            saveDB(user);
            return HttpStatus.CREATED;
        }
    }

    @DeleteMapping("/delete")
    public HttpStatus deleteStudent(@RequestParam String uname) {
        try{
            userServices.deleteUser(uname);
            deleteUser(uname);
            return HttpStatus.OK;
        }catch (Exception e){
            return HttpStatus.BAD_REQUEST;
        }
    }

    public void deleteUser(String username){
        try {
            Class.forName ("org.h2.Driver");
            Connection connection = DriverManager.getConnection ("jdbc:h2:tcp://localhost/~/test", "sa","123");
            String sql = "delete from USER where username = ?";
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setString(1,username);
            ps.executeUpdate();
        }catch (SQLException | ClassNotFoundException ex){
            System.out.println("khong thanh cong!!");
        }

    }

    public void saveDB(User user){
        try {
            Class.forName ("org.h2.Driver");
            Connection connection = DriverManager.getConnection ("jdbc:h2:tcp://localhost/~/test", "sa","123");
            String sql = "insert into USER values(?,?,?,?,?)";
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setString(1,user.getUname());
            ps.setString(2,passwordEncoder.encode(user.getPasswd()));
            ps.setString(3,user.getFirstName());
            ps.setString(4,user.getLastName());
            ps.setString(5,user.getEmail());
            ps.executeUpdate();
        }catch (SQLException | ClassNotFoundException ex){
            System.out.println("khong thanh cong!!");
        }

    }
}
