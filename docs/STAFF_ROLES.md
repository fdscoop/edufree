# 👥 EduFree Staff Roles – Complete Guide

## 🎯 Overview

EduFree defines four hierarchical staff roles inside the `staff` table. Each role controls which dashboards are shown and which data Supabase policies expose.

---

## 1. 🔐 `super_admin`

**Access:** Full platform (no limitations).  
**Primary responsibility:** Owns the entire content pipeline plus staffing.

**Can:**
- Upload, approve, reject, and publish official videos for the student app
- Manage subjects, classes, chapters, lessons
- Create/disable state admins, district coordinators, and teachers
- View every analytics dashboard
- Override any role’s decision or restriction

**Cannot:** Nothing—this is the top-level owner.

```sql
role = 'super_admin'
state_code = NULL
district_code = NULL
subject_id = NULL
assigned_classes = NULL
```

Example: platform owner / CTO / technical admin.

---

## 2. 🏛️ `state_admin`

**Access:** One state.  
**Focus:** Administration and performance tracking (no publishing rights).

**Can:**
- Manage districts within their state
- Assign/disable district coordinators and subject teachers
- Track state-wide progress and analytics
- Review district performance
- Coordinate content tasks with districts (without publishing)

**Cannot:**
- Upload/approve/publish official videos
- Create other state admins or super admins
- Modify platform-wide structure (subjects/classes outside their state)

```sql
role = 'state_admin'
state_code = 'KL'   -- e.g., Kerala
district_code = NULL
subject_id = NULL
assigned_classes = NULL
```

Example: state education officer.

---

## 3. 📋 `district_coordinator`

**Access:** One district.  
**Focus:** Teacher management + content coordination.

**Can:**
- Add/manage teachers inside district
- Assign teachers to students / manage assignments
- Review draft lessons recorded by teachers
- Coordinate recording sessions and local content efforts
- Organize student assignments/events
- Monitor district performance

**Cannot:**
- Publish videos to the student platform (they can only review and forward to super admin)
- Change global subject/class definitions
- Access other districts

```sql
role = 'district_coordinator'
state_code = 'KL'
district_code = 'KL-MLP'  -- e.g., Malappuram
subject_id = NULL
assigned_classes = NULL OR ARRAY[6,7,8]
```

Example: local NOS administrator.

---

## 4. 👨‍🏫 `subject_teacher`

**Access:** Only assigned students and their subject.

**Can:**
- Teach and support assigned students
- Track assigned student progress
- Conduct live sessions / create quizzes
- Upload draft video lessons **only** when a coordinator assigns the task (internal review content)

**Cannot:**
- Publish videos publicly or bypass approval
- Access district/state analytics
- Manage other teachers or coordinators

```sql
role = 'subject_teacher'
state_code = 'KL'
district_code = 'KL-MLP'
subject_id = 5           -- e.g., Mathematics
assigned_classes = ARRAY[6,7,8]
```

Example: math teacher responsible for classes 6–8.

---

## 📊 Role Hierarchy

```
super_admin
  └─ state_admin
       └─ district_coordinator
            └─ subject_teacher
```

Each level creates/manages the level beneath it.

---

## 🛠️ Creating Roles

```sql
-- Super Admin
INSERT INTO staff (user_id, email, name, role, is_active)
VALUES ('user-uuid', 'admin@edufree.com', 'Platform Admin', 'super_admin', true);

-- State Admin
INSERT INTO staff (user_id, email, name, role, state_code, is_active)
VALUES ('user-uuid', 'kerala.admin@edufree.com', 'Kerala Admin', 'state_admin', 'KL', true);

-- District Coordinator
INSERT INTO staff (user_id, email, name, role, state_code, district_code, is_active)
VALUES ('user-uuid', 'mlp.coord@edufree.com', 'Malappuram Coordinator', 'district_coordinator', 'KL', 'KL-MLP', true);

-- Subject Teacher
INSERT INTO staff (user_id, email, name, role, state_code, district_code, subject_id, assigned_classes, is_active)
VALUES ('user-uuid', 'math.teacher@edufree.com', 'Rajesh Kumar', 'subject_teacher', 'KL', 'KL-MLP', 5, ARRAY[6,7,8], true);
```

---

## 🔍 Auditing Roles

```sql
SELECT s.name,
       s.email,
       s.role,
       s.state_code,
       s.district_code,
       sub.name AS subject_name,
       s.assigned_classes,
       s.is_active
FROM staff s
LEFT JOIN subjects sub ON sub.id = s.subject_id
ORDER BY CASE s.role
         WHEN 'super_admin' THEN 1
         WHEN 'state_admin' THEN 2
         WHEN 'district_coordinator' THEN 3
         ELSE 4 END,
         s.name;
```

---

## ✅ Best Practices

1. Keep the number of super admins minimal.  
2. Assign exactly one state admin per state.  
3. Limit coordinators to their district(s).  
4. Teachers should only have `subject_teacher` and rely on coordinators for assignments.

Use targeted `UPDATE staff ... SET role = ...` statements to switch roles for testing, and remember to adjust `state_code`, `district_code`, and `subject_id` accordingly.
