package com.typeface.dropface.repository;

import com.typeface.dropface.model.FileEntity;
import com.typeface.dropface.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByUser(User user);
}