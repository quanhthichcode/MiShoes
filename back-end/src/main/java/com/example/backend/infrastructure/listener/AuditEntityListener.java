
/*
package com.example.backend.infrastructure.listener;

import com.tiinstore.entity.base.AuditEntity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.util.Calendar;


public class AuditEntityListener {

    private static final String idAccount = "d69164ec-11b8-11ee-be56-0242ac120002";

    @PrePersist
    private void onCreate(AuditEntity entity) {
        entity.setCreatedDate(getCurrentTime());
        entity.setLastModifiedDate(getCurrentTime());
    }

    @PreUpdate
    private void onUpdate(AuditEntity entity) {
        entity.setLastModifiedDate(getCurrentTime());
    }

    private long getCurrentTime() {
        return Calendar.getInstance().getTimeInMillis();
    }
}
*/

//package com.example.backend.infrastructure.listener;
//
//import com.tiinstore.entity.base.AuditEntity;
//import jakarta.persistence.PrePersist;
//import jakarta.persistence.PreUpdate;
//
//import java.util.Calendar;
//
//
//public class AuditEntityListener {
//
//    private static final String idAccount = "d69164ec-11b8-11ee-be56-0242ac120002";
//
//    @PrePersist
//    private void onCreate(AuditEntity entity) {
//        entity.setCreatedDate(getCurrentTime());
//        entity.setLastModifiedDate(getCurrentTime());
//    }
//
//    @PreUpdate
//    private void onUpdate(AuditEntity entity) {
//        entity.setLastModifiedDate(getCurrentTime());
//    }
//
//    private long getCurrentTime() {
//        return Calendar.getInstance().getTimeInMillis();
//    }
//}

