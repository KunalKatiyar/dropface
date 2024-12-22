package com.typeface.dropface.service;

import com.typeface.dropface.file.FileResponse;
import com.typeface.dropface.model.FileEntity;
import com.typeface.dropface.model.User;
import com.typeface.dropface.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;
    private final FileStorageService fileStorageService;

    public FileResponse uploadFile(MultipartFile file, User user) {
        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        fileStorageService.storeFile(file, filename);

        FileEntity fileEntity = FileEntity.builder()
                .name(file.getOriginalFilename())
                .path(filename)
                .contentType(file.getContentType())
                .size(file.getSize())
                .uploadedAt(LocalDateTime.now())
                .user(user)
                .build();

        fileRepository.save(fileEntity);

        return mapToFileResponse(fileEntity);
    }

    public List<FileResponse> getUserFiles(User user) {
        return fileRepository.findByUser(user)
                .stream()
                .map(this::mapToFileResponse)
                .collect(Collectors.toList());
    }

    public Resource downloadFile(Long fileId, User user) {
        FileEntity file = fileRepository.findById(fileId)
                .filter(f -> f.getUser().equals(user))
                .orElseThrow(() -> new RuntimeException("File not found"));

        try {
            Path filePath = fileStorageService.getFilePath(file.getPath());
            Resource resource = new UrlResource(filePath.toUri());

            if(resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found");
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found", ex);
        }
    }

    private FileResponse mapToFileResponse(FileEntity file) {
        return FileResponse.builder()
                .id(file.getId())
                .name(file.getName())
                .contentType(file.getContentType())
                .size(file.getSize())
                .uploadedAt(file.getUploadedAt())
                .build();
    }

    public void deleteFile(Long fileId, User user) {
        FileEntity file = fileRepository.findById(fileId)
                .filter(f -> f.getUser().equals(user))
                .orElseThrow(() -> new RuntimeException("File not found"));
        Path filePath = fileStorageService.getFilePath(file.getPath());
        java.io.File fileToDelete = filePath.toFile();
        if(fileToDelete.delete()) {
            fileRepository.delete(file);
        } else {
            throw new RuntimeException("Could not delete file");
        }
    }
}