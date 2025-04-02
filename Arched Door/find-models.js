const fs = require("fs");
const path = require("path");

// List of model directories
const modelDirs = [
    "Arched Door", "Book", "Bunny", "Cat Feeder", "Cute Desk Chair", 
    "Desk", "Dog", "Gaming Desktop", "Light Switch", "Night Light", 
    "Old Radio", "Orchids", "Organizer", "Pastel Keyboard", "Pencil", 
    "Pink Pet Bed", "Pocket Pet", "Tassel Rug", "Tassel Rug 2", 
    "Tulip Guestbook", "Violet Bed"
];

// Find VOX files in each directory
const modelFiles = {};

modelDirs.forEach(dir => {
    try {
        const dirPath = path.join(__dirname, dir);
        const files = fs.readdirSync(dirPath);
        
        // Find VOX files
        const voxFiles = files.filter(file => file.toLowerCase().endsWith(".vox"));
        
        if (voxFiles.length > 0) {
            // Store the first VOX file path
            modelFiles[dir] = path.join(dir, voxFiles[0]);
            console.log(`Found ${voxFiles[0]} in ${dir}`);
        } else {
            console.log(`No VOX files found in ${dir}`);
        }
    } catch (error) {
        console.error(`Error processing ${dir}:`, error.message);
    }
});

// Write the results to a JSON file
fs.writeFileSync("model-paths.json", JSON.stringify(modelFiles, null, 2));
console.log("Model paths saved to model-paths.json");
