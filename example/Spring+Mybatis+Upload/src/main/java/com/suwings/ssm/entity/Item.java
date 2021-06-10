package com.suwings.ssm.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class Item {
    int id;
    String name;
    String category;
    String brand;
    String picAddress;
    int price;
    int stock;
}
