package com.typeface.dropface.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Represents a file uploaded by a user.
 * <p>
 *     This class is used to store information about a file uploaded by a user.
 *     It contains the following fields:
 *     <ul>
 *         <li>id: the unique identifier of the file</li>
 *         <li>name: the name of the file</li>
 *         <li>path: the path to the file</li>
 *         <li>contentType: the content type of the file</li>
 *         <li>size: the size of the file</li>
 *         <li>uploadedAt: the date and time the file was uploaded</li>
 *         <li>user: the user who uploaded the file</li>
 *     </ul>
 *  <p>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "files")
public class FileEntity {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    private String path;
    private String contentType;
    private long size;
    private LocalDateTime uploadedAt;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}