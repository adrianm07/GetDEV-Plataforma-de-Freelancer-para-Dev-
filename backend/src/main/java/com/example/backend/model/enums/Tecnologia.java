package com.example.backend.model.enums;


public enum Tecnologia {
    TYPESCRIPT("TYPESCRIPT"),
    JAVASCRIPT("JAVASCRIPT"),
    PYTHON("PYTHON"),
    JAVA("JAVA"),
    PHP("PHP"),
    CSHARP("C#"),
    RUBY("RUBY"),
    GO("GO"),
    RUST("RUST"),
    SWIFT("SWIFT"),
    KOTLIN("KOTLIN"),
    HTMLCSS("HTML/CSS"),
    REACT("REACT"),
    VUEJS("VUE.JS"),
    ANGULAR("ANGULAR"),
    NEXTJS("NEXT.JS"),
    TAILWINDCSS("TAILWIND.CSS"),
    BOOTSTRAP("BOOTSTRAP"),
    REDUX("REDUX"),
    NODEJS("NODEJS"),
    EXPRESSJS("EXPRESSJS"),
    DJANGO("DJANGO"),
    FLASK("FLASK"),
    SPRINGBOOT("SPRING BOOT"),
    ASPNET("ASPNET"),
    REACTNATIVE("REACT NATIVE"),
    FLUTTER("FLUTTER"),
    IONIC("IONIC"),
    POSTGRESQL("POSTGRESQL"),
    MYSQL("MYSQL"),
    MONGODB("MONGODB"),
    REDIS("REDIS"),
    FIREBASE("FIREBASE");

    private final String nome;

    Tecnologia(String nome){
        this.nome = nome;
    }

    public static Tecnologia getTecnologia(String nome) {
        return Tecnologia.valueOf(nome.toUpperCase());
    }
}
