package com.example.login;

import com.example.login.entity.User;
import com.example.login.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.sql.*;

@SpringBootApplication
public class LoginApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoginApplication.class, args);
    }



    @Bean
    CommandLineRunner init(UserRepository userRepository) {
        return args -> {
            String sql = "select * from USER";
            try{
                Class.forName ("org.h2.Driver");
                Connection connection = DriverManager.getConnection ("jdbc:h2:tcp://localhost/~/test", "sa","123");
                PreparedStatement ps = connection.prepareStatement(sql);
                ResultSet rs = ps.executeQuery();
                while (rs.next()){
                    User st = new User();
                    st.setFirstName(rs.getString("FIRSTNAME"));
                    st.setLastName(rs.getString("LASTNAME"));
                    st.setUname(rs.getString("USERNAME"));
                    st.setEmail(rs.getString("EMAIL"));
                    st.setPasswd(rs.getString("PASSWORD"));
                    userRepository.save(st);

                }
            }catch (SQLException |ClassNotFoundException e){
                System.out.println("khong thanh cong!!");
            }
        };
    }
}
