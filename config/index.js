module.exports = {
    script: {
        do_not_compile: [
            "config"
        ],

        project_types: {
            "project name": ["directory1", "directory2"]
        }
    },

    website: {
        port: 3001,
    },

    shared: {
        extension: ".easycompile",
    }
}