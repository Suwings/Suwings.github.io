package com.suwings;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// 持续化注解
@Target(value= {ElementType.TYPE,ElementType.METHOD,ElementType.FIELD})
@Retention(value = RetentionPolicy.RUNTIME)
public @interface MyAnnotationDefinition {
    int id();
    String name();
}
