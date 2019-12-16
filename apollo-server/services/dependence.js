const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');

function dependenceTranslate (dependencies) {
    let arr = [];
    for (let key in dependencies) {
        arr.push({
            name: key,
            version: dependencies[key]
        });
    }
    return arr;
}

module.exports = {
    dependencies: async () => {
        const file = path.join(process.cwd(), 'package.json');
        const packageJSON = JSON.parse(fs.readFileSync(file).toString('utf-8'));
        const _dependencies = packageJSON.dependencies;
        const _devDependencies = packageJSON.devDependencies;
        return {
            dependencies: dependenceTranslate(_dependencies),
            devDependencies: dependenceTranslate(_devDependencies)
        };
    },
    install: (name, type, socket) => {
        const ls = spawn('yarn', ['add', name, `-${type}`]);
        ls.stdout.on('data', (data) => {
            socket.emit('log push', data.toString());
            console.log(`stdout: ${data}`);
        })
        ls.stderr.on('data', (data) => {
            socket.emit('log push', data.toString());
        });
        ls.on('close', (code) => {
            console.log(`子进程退出，使用退出码 ${code}`);
        });
        return name;
    }
}