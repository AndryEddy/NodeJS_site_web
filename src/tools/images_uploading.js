const multer = require("multer");
const sharp = require("sharp");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

const storage =  multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

const uploads = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const uploadFiles = uploads.array("images", 10);

const checkUpload = (req, res) => {
    uploadFiles(req, res, err => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                return res.send("Too many files to upload.");
            }
        } else if (err) {
            return res.send(err);
        }
    });
};

const generateImage = async (req, record) => {
    if (!req.body.files) return false;
    console.log(record.first_name);
    console.log(record.id);
    req.body.images = [];
    await Promise.all(
        req.body.files.map(async file => {
            const filename = file.originalname.replace(/\..+$/, "");
            const newFilename = `esti-pic-${filename}-${Date.now()}.jpeg`;
            const images_path = `${__dirname}/upload/${newFilename}`;
            await sharp(file.buffer)
                .resize(640, 320)
                .toFormat('jpeg', sharp)
                .jpeg({ quality: 90 })
                .toFile(images_path).then(update_data => {
                    record.update({files: images_path}, {
                        where: {id: record.id}
                    })
                });
            req.body.images.push(newFilename)
        })
    );
    return record
};

module.exports = {
    checkUpload: checkUpload,
    generateImage: generateImage,
};