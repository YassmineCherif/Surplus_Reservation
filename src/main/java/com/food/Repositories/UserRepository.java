package com.food.Repositories;

import com.food.Entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Query("SELECT u.login FROM User u")
    List<String> findAllUserLogins();

    List<User> findAll();

    User findByLogin(String login);

    User findByEmail(String email);

}
