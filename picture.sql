-- TEMPLATE TABLE
CREATE TABLE
	IF NOT EXISTS `TABLE_TEMPLATE` (
		-- `id` bây giờ thường được nâng cấp lên UUIDv7
		`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
		-- 
		-- 
		-- `deletedBy` INT NOT NULL DEFAULT 0,
		-- `deletedAt` TIMESTAMP NULL DEFAULT NULL,
		`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
		`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	);
	
-- NGUOI DUNG 
CREATE TABLE
	IF NOT EXISTS `nguoi_dung` (
		`nguoi_dung_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
		`email` VARCHAR(255),
		`mat_khau` VARCHAR(255),
		`ho_ten` VARCHAR(255),
		`tuoi` INT,
		`anh_dai_dien` VARCHAR(255),
		`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
		`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	);
ALTER TABLE nguoi_dung
MODIFY email VARCHAR(255) NOT NULL UNIQUE;
	
	
-- 	HINH ANH
CREATE TABLE
	IF NOT EXISTS `hinh_anh` (
		`hinh_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
		`ten_hinh` VARCHAR(255),
		`duong_dan` VARCHAR(255),
		`mo_ta` VARCHAR(255),
		`nguoi_dung_id` INT NOT NULL,
		FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
		`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
		`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	);
	
-- 	BINH LUAN
CREATE TABLE
	IF NOT EXISTS `binh_luan` (
		`binh_luan_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
		
		`nguoi_dung_id` INT NOT NULL,
		FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
		
		`hinh_id` INT NOT NULL,
		FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`),
		
		`ngay_binh_luan` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		`noi_dung` VARCHAR(255),
		
		`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
		`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	);
	
-- 	LUU ANH
CREATE TABLE
	IF NOT EXISTS `luu_anh` (
		`luu_anh_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

		
		`nguoi_dung_id` INT NOT NULL,
		FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
		
		`hinh_id` INT NOT NULL,
		FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`),
		
		`ngay_luu` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		
		`isDeleted` TINYINT (1) NOT NULL DEFAULT 0,
		`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	);
	
-- TẠO DỮ LIỆU MẪU 
-- NGƯỜI DÙNG 
INSERT INTO nguoi_dung (
    email,
    mat_khau,
    ho_ten,
    tuoi,
    anh_dai_dien,
    isDeleted
) VALUES
('user1@gmail.com', '123456', 'Nguyễn Văn An', 22, 'avatar1.jpg', 0),
('user2@gmail.com', '123456', 'Trần Thị Bình', 25, 'avatar2.jpg', 0),
('user3@gmail.com', '123456', 'Lê Văn Cường', 28, 'avatar3.jpg', 0),
('user4@gmail.com', '123456', 'Phạm Thị Dung', 21, 'avatar4.jpg', 0),
('user5@gmail.com', '123456', 'Hoàng Văn Em', 30, 'avatar5.jpg', 0);
-- HINH ANH 
INSERT INTO hinh_anh (
    ten_hinh,
    duong_dan,
    mo_ta,
    nguoi_dung_id,
    isDeleted
) VALUES
('Ảnh du lịch Đà Nẵng', '/images/danang1.jpg', 'Du lịch biển Mỹ Khê', 1, 0),
('Ảnh profile', '/images/avatar_user2.png', 'Ảnh đại diện cá nhân', 2, 0),
('Ảnh món ăn', '/images/food1.jpg', 'Món bún bò Huế', 3, 0),
('Ảnh phong cảnh', '/images/nature1.jpg', 'Phong cảnh núi rừng', 4, 0),
('Ảnh sự kiện', '/images/event1.jpg', 'Tham gia hội thảo công nghệ', 5, 0);
-- BINH LUAN 
INSERT INTO binh_luan (
    nguoi_dung_id,
    hinh_id,
    noi_dung,
    isDeleted
) VALUES
(2, 1, 'Ảnh chụp đẹp quá, nhìn là muốn đi du lịch liền!', 0),
(3, 1, 'Biển Mỹ Khê đúng là rất đẹp, chụp góc này xịn ghê.', 0),
(1, 2, 'Ảnh đại diện nhìn rất chuyên nghiệp 👍', 0),
(5, 3, 'Bún bò Huế nhìn ngon quá, cho xin địa chỉ quán với!', 0),
(4, 5, 'Hội thảo này nghe nói nhiều kiến thức hay lắm.', 0);
-- LUU ẢNH
INSERT INTO luu_anh (
    nguoi_dung_id,
    hinh_id,
    isDeleted
) VALUES
(1, 2, 0), -- Nguyễn Văn An lưu ảnh profile
(2, 1, 0), -- Trần Thị Bình lưu ảnh du lịch Đà Nẵng
(3, 3, 0), -- Lê Văn Cường lưu ảnh món ăn
(4, 5, 0), -- Phạm Thị Dung lưu ảnh sự kiện
(5, 4, 0); -- Hoàng Văn Em lưu ảnh phong cảnh





