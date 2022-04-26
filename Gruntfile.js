module.exports = function(grunt) {
  grunt.initConfig({
    "semver": {
      "options": {
        // Task-specific options go here.
        space: "\t"
      },
      "package": {
        // Target-specific file lists and/or options go here.
        files: [
          {
            src: "package.json",
            dest: "package.json"
          }
        ]
      },
    },
  });

  grunt.loadNpmTasks('grunt-semver');
};
