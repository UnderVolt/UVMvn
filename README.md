# UVMvn
Private maven/gradle server made in nodejs with <3

# How to use
Put your artifacts in the modules folder
/modules/[package]/[artifact]/[version]/[artifact]-[version].[ext]
```
Commands: 
--relative=Boolean - Default: false
    If relative is false you can use dots instead of the full path
    
    Relative = false 
        "/io.undervolt.mvn/EventSystem/1.0/EventSystem-1.0.jar"
    Relative = true 
        "/io/undervolt/mvn/EventSystem/1.0/EventSystem-1.0.jar"

--path=String - Default: "/modules" (Can be relative or absolute)
    You can change the modules folder using --path="C:/Modules"

    Default: 
        "modules/io/undervolt/mvn/EventSystem/1.0/EventSystem-1.0.jar"
    Changed: 
        "C:/Modules/io/undervolt/mvn/EventSystem/1.0/EventSystem-1.0.jar"

--port=Number - Default: 8080

Maven POM: 
    <repositories>
        <repository>
          <id>uvmvn</id>
          <name>UVMvn Repository</name>
          <url>http://[host-ip]:[host-port]/maven</url>
        </repository>
    </repositories>
    
Gradle BUILD:
    maven {
        name 'UVMvn Repository'
        url 'http://[host-ip]:[host-port]/maven' 
    }
    
```

That's it!
