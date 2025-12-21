package com.example.backend.model.user;

import com.example.backend.model.post.Post;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@DiscriminatorValue("CONTRATANTE")
public class Contratante extends User {

    @OneToMany(mappedBy = "contratante", cascade = CascadeType.ALL)
    private List<Post> posts;


}
