import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Get current file path in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create models directory if it doesn't exist
if (!fs.existsSync('models')) {
    fs.mkdirSync('models')
}

// Copy model-paths.json to the current directory
if (fs.existsSync('Arched Door/model-paths.json')) {
    fs.copyFileSync('Arched Door/model-paths.json', 'model-paths.json')
    console.log('Copied model-paths.json to current directory')
} else {
    console.log('Running find-models.js to generate model-paths.json')
    // We need to dynamically import in ESM
    const findModelsPath = path.join(__dirname, 'Arched Door', 'find-models.js')
    import(findModelsPath)
}

// Create symbolic links to model directories
const modelDirs = [
    "Arched Door", "Book", "Bunny", "Cat Feeder", "Cute Desk Chair", 
    "Desk", "Dog", "Gaming Desktop", "Light Switch", "Night Light", 
    "Old Radio", "Orchids", "Organizer", "Pastel Keyboard", "Pencil", 
    "Pink Pet Bed", "Pocket Pet", "Tassel Rug", "Tassel Rug 2", 
    "Tulip Guestbook", "Violet Bed"
]

modelDirs.forEach(dir => {
    const sourcePath = path.join(__dirname, dir)
    const targetPath = path.join(__dirname, 'models', dir)
    
    if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
        try {
            // Create directory if it doesn't exist
            if (!fs.existsSync(path.dirname(targetPath))) {
                fs.mkdirSync(path.dirname(targetPath), { recursive: true })
            }
            
            // Create symbolic link
            fs.symlinkSync(sourcePath, targetPath, 'junction')
            console.log(`Created symbolic link for ${dir}`)
        } catch (error) {
            console.error(`Error creating symbolic link for ${dir}:`, error.message)
            
            // If symlink fails, try copying the directory
            try {
                fs.mkdirSync(targetPath, { recursive: true })
                const files = fs.readdirSync(sourcePath)
                files.filter(file => file.toLowerCase().endsWith('.vox')).forEach(file => {
                    fs.copyFileSync(path.join(sourcePath, file), path.join(targetPath, file))
                })
                console.log(`Copied VOX files for ${dir}`)
            } catch (copyError) {
                console.error(`Error copying files for ${dir}:`, copyError.message)
            }
        }
    }
})

console.log('Setup complete. Run "npm start" to start the server and view the 3D room.')
