package com.food.Services;

import com.food.Entities.User;
import com.food.Repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.RandomStringUtils;



import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;


    public void sendSimpleEmail(String toEmail,
                                String subject,
                                String body
    ) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("indila205@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
        System.out.println("Mail sent successfully...");
    }

    public User findByLogin(String login) {
        User user = userRepository.findByLogin(login);
        if (user == null) {
            throw new EntityNotFoundException("User not found with login: " + login);
        }
        return user;
    }


    public User saveUser(User user) {
        // No need to encode the password anymore
        return userRepository.save(user);
    }


    public List<String> getAllUserLogins() {
        return userRepository.findAllUserLogins(); // Fetch user logins from the repository
    }


    public void resetPassword(String email) {
        try {
            User user = userRepository.findByEmail(email);

            if (user != null) {
                String newPassword = generateRandomPassword();

                // Directly update the user's password without creating a new user instance
                user.setMdp(newPassword);
                userRepository.save(user);

                // Send the new password to the user's email
                sendEmail(user.getEmail(), "Password Reset", "Your new password is: " + newPassword);
            } else {
                throw new IllegalArgumentException("No user found with the provided email");
            }
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            throw e; // Re-throw the exception to be handled by the controller
        }
    }



    private String generateRandomPassword() {
        // Generate a random password with 3 characters, 3 digits, and 2 symbols
        return RandomStringUtils.random(3, true, false) +
                RandomStringUtils.random(3, false, true) +
                RandomStringUtils.random(2, 33, 47, false, false);
    }

    private void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("indila205@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }




    public void updateUserProfile(String login, User user) throws Exception {
        User existingUser = userRepository.findByLogin(login);
        if (existingUser == null) {
            throw new Exception("User not found");
        }
        if (user.getMdp() != null && !user.getMdp().isEmpty()) {
            existingUser.setMdp(user.getMdp());
        }
        existingUser.setEmail(user.getEmail());
        existingUser.setNumtel(user.getNumtel());
        // Update other fields if necessary

        userRepository.save(existingUser);
    }

}




