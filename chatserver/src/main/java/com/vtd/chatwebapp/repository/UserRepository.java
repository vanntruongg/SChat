package com.vtd.chatwebapp.repository;

import com.vtd.chatwebapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.userId != :userId AND NOT EXISTS " +
            "(SELECT 1 FROM Friend f WHERE (f.sender.userId = :userId OR f.receiver.userId = :userId) " +
            "AND (u.userId = f.sender.userId OR u.userId = f.receiver.userId))")
    List<User> findNotFriends(@Param("userId") Long userId);

}
