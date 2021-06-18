module.exports = {
  root: true,
  extends: '@react-native-community',
  settings:{
    "import/resolver":{
      typescript:{},
      "babel-plugin-root-import":{
        rootPathPrefix:"~",
        rootPathSuffix:'src'
      }
    }
  }
  
};
