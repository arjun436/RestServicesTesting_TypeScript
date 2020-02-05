<p align="center">
<img src= "https://github.com/arjun436/RestServicesTesting_TypeScript/blob/master/image/1.png"/>
<img src= "https://github.com/arjun436/RestServicesTesting_TypeScript/blob/master/image/2.png"/>
</p>

<p align="center">
   <i><strong>This project demonstrates the basic RestAPITesting-typescript-ExtetnReports framework project setup.
</strong></i>
<p>

<p align="center">
<a href="https://opensource.org/licenses/MIT"><img alt="MIT License" src="https://img.shields.io/dub/l/vibe-d.svg"></a>
</p>

---


### RestAPITesting-typescript-ExtetnReports Setup Guide   

### Features
* Rest API web services testing using typescript
* No typings.json or typings folder, they have been replaced by better **'@types'** modules in package.json.
* All scripts written with > Typescript2.0.
* Neat folder structures with transpiled js files in separate output folder.
* Page Object design pattern implementation.
* Allure Reporting
* Screenshots on failure feature scenarios.

## Table of Contents (Optional)

- [Preconditions](#Preconditions)
- [MAVEN_Dependencies](#MAVEN_Dependencies)
- [SetUp](#SetUp)
- [Configuration](#Configuration)
- [Results](#Results)
- [Support](#Support)

---

## Preconditions
```bash
- Maven 
- Java 8
- Cucumber Eclipse plugin
- NodeJS installed globally in the system.
https://nodejs.org/en/download/
- Chrome or Firefox browsers installed.
```

## MAVEN_Dependencies
Add the following dependencies to your `pom.xml`
All below dependencies are compatible.

```maven
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-1nstance "
	xsi:schemaLocation="http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>ru.yandex.allure</groupId>
	<artifactId>protractor</artifactId>
	<version>1.0-SNAPSHOT</version>
	<properties>
		<allure.version>1.4.15</allure.version>
		<allure.maven.version>2.2</allure.maven.version>
		<!-- Relative to the dir you're running from -->
		<allure.results_pattern>allure-results</allure.results_pattern>
	</properties>
	<dependencies>
		<dependency>
			<groupId>ru.yandex.qatools.allure</groupId>
			<artifactId>allure-report-face</artifactId>
			<version>${allure.version}</version>
			<type>war</type>
		</dependency>
		<!-- https://mvnrepository.com/artifact/io.qameta.allure/allure-commandline -->
		<dependency>
			<groupId>io.qameta.allure</groupId>
			<artifactId>allure-commandline</artifactId>
			<version>2.13.1</version>
		</dependency>

	</dependencies>
	<build>
		<plugins>
			<plugin>
				<groupId>org.eclipse.jetty</groupId>
				<artifactId>jetty-maven-plugin</artifactId>
				<version>9.2.10.v20150310</version>
				<configuration>
					<webAppSourceDirectory>target/site/allure-
						maven-plugin
					</webAppSourceDirectory>
					<stopKey>stop</stopKey>
					<stopPort>2299</stopPort>
				</configuration>
			</plugin>
			<plugin>
				<groupId>io.qameta.allure</groupId>
				<artifactId>allure-maven</artifactId>
				<version>2.8</version>
				<configuration>
					<properties>
						<allure.issues.tracker.pattern>http://example.com/%s
						</allure.issues.tracker.pattern>
					</properties>
					<!-- <reportDirectory>allure-results</reportDirectory> -->
				</configuration>
			</plugin>
		</plugins>
	</build>
	<reporting>
		<excludeDefaults>true</excludeDefaults>
		<plugins>
			<plugin>
				<groupId>ru.yandex.qatools.allure</groupId>
				<artifactId>allure-maven-plugin</artifactId>
				<version>${allure.maven.version}</version>
				<configuration>
					<resultsPattern>${allure.results_pattern}</resultsPattern>
					<!--<reportVersion>l.4.15</reportVersion> -->
				</configuration>
			</plugin>
		</plugins>
	</reporting>
</project>
```

## SetUp
* Clone the repository into a folder
* Import the project as maven project
* Go inside the folder and run following command from terminal/command prompt
```
npm install 
```
* All the dependencies from package.json and ambient typings would be installed in node_modules folder.

#### Run Scripts

* First step is update the protractors webdriver if we are using any UI testing. 
* Then you can run test. 
* Then Generate allure report and Open it. Please look into package.json scripts section
```
npm run preprotractor && npm run test && npm run allureGenerate && npm run allureOpen '**
```

## Configuration

* Install ```npm i wdio-allure-reporter``` for allure reporting
* Install ```npm i request``` and ```npm i should``` for Restful webservices testing
* Include following script in package.json file
```
"scripts": {
		"preinstall": "npm cache clear",
		"test": "protractor protractor.conf.js",
		"allureGenerate": "allure generate allure-results -c",
		"allureOpen": "allure open allure-report",
		"preprotractor": "webdriver-manager update --versions.chrome=2.40 --versions.standalone=3.141.59 --ignore_ssl"
	},
```

* Demo script for Restful testing:

```
import { factory } from "../ConfigLog4j";

const should = require( "should" );
const request = require( "request" );
const getURL = "https://reqres.in/api/users?page=2";
const posttURL = "https://reqres.in/api/users";
const putURL = "https://reqres.in/api/users/2";

const util = require( "util" );
const log = factory.getLogger( "protractor" );

var postObj = require( '../TestData/post.json' );

var putObj = require( '../TestData/put.json' );

describe( 'API Get response', function() {
    it( 'returns API Get response', function( done ) {
        request.get( { url: getURL },
            function( error, response, body ) {
                const bodyObj = JSON.parse( body );
                log.info(() => "body is :z " + body );
                log.info(() => "error :: " + error );
                log.info(() => "response status is ::‘" +
                    response.statusCode );
                console.log( response.headers['content—type'] )

                expect( response.statusCode ).toEqual( 200 );
                done();
            } )
    } );


    it( 'returns POST response', function( done ) {
        request.post( putURL, {
            form: postObj
        }, function( error, response, body ) {
            const bodyobj = JSON.parse( body );
            log.info(() => "body is :: " + body );
            log.info(() => "error :: " + error );
            log.info(() => "response status is :: " + response.statusCode );
            console.log( response.headers['Content—type'] )
            expect( response.statusCode ).toEqual( 201 );
            done()
        } )
    } );

    it( 'returns PUT response', function( done ) {

        request.put( putURL, {
            form: putObj
        }, function( error, response, body ) {
            const bodyObj = JSON.parse( body );
            log.info(() => "body is :: " + body );
            log.info(() => "error :: " + error );
            log.info(() => "response status is :: " + response.statusCode );
            console.log( response.headers['content—type'] )
            expect( response.statusCode ).toEqual( 200 );
            done();
        } );
    } );
} );

```

## Results

* Terminal Log
```
C:\Users\arjun\git\RestServicesTesting_TypeScript>npm run preprotractor && npm run test && npm run allureGenerate && npm run allureOpen

> soapservices_typescript@1.0.0 preprotractor C:\Users\arjun\git\RestServicesTesting_TypeScript
> webdriver-manager update --versions.chrome=2.40 --versions.standalone=3.141.59 --ignore_ssl

[22:08:30] I/http_utils - ignoring SSL certificate
[22:08:30] I/http_utils - ignoring SSL certificate
[22:08:30] I/http_utils - ignoring SSL certificate
[22:08:30] I/http_utils - ignoring SSL certificate
[22:08:30] I/http_utils - ignoring SSL certificate
[22:08:30] I/http_utils - ignoring SSL certificate
[22:08:31] I/update - chromedriver: file exists C:\Users\arjun\git\RestServicesTesting_TypeScript\node_modules\protractor\node_modules\webdriver-manag
er\selenium\chromedriver_2.40.zip
[22:08:31] I/update - chromedriver: unzipping chromedriver_2.40.zip
[22:08:31] I/update - chromedriver: chromedriver_2.40.exe up to date
[22:08:31] I/update - selenium standalone: file exists C:\Users\arjun\git\RestServicesTesting_TypeScript\node_modules\protractor\node_modules\webdrive
r-manager\selenium\selenium-server-standalone-3.141.59.jar
[22:08:31] I/update - selenium standalone: selenium-server-standalone-3.141.59.jar up to date
[22:08:32] I/update - geckodriver: file exists C:\Users\arjun\git\RestServicesTesting_TypeScript\node_modules\protractor\node_modules\webdriver-manage
r\selenium\geckodriver-v0.26.0.zip
[22:08:32] I/update - geckodriver: unzipping geckodriver-v0.26.0.zip
[22:08:32] I/update - geckodriver: geckodriver-v0.26.0.exe up to date

> soapservices_typescript@1.0.0 test C:\Users\arjun\git\RestServicesTesting_TypeScript
> protractor protractor.conf.js

[22:08:34] I/launcher - Running 1 instances of WebDriver
[22:08:34] I/direct - Using ChromeDriver directly...

DevTools listening on ws://127.0.0.1:60571/devtools/browser/b0899c13-2292-4ead-a045-530319fc50b7
Jasmine started
browserName: chrome
undefined
undefined
2020-02-05 22:08:37,707 INFO [protractor] body is :z {"page":2,"per_page":6,"total":12,"total_pages":2,"data":[{"id":7,"email":"michael.lawson@reqres.
in","first_name":"Michael","last_name":"Lawson","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"},{"id":8,"email":"lindsa
y.ferguson@reqres.in","first_name":"Lindsay","last_name":"Ferguson","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"},{"id":
9,"email":"tobias.funke@reqres.in","first_name":"Tobias","last_name":"Funke","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jp
g"},{"id":10,"email":"byron.fields@reqres.in","first_name":"Byron","last_name":"Fields","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/russo
edu/128.jpg"},{"id":11,"email":"george.edwards@reqres.in","first_name":"George","last_name":"Edwards","avatar":"https://s3.amazonaws.com/uifaces/faces
/twitter/mrmoiree/128.jpg"},{"id":12,"email":"rachel.howell@reqres.in","first_name":"Rachel","last_name":"Howell","avatar":"https://s3.amazonaws.com/u
ifaces/faces/twitter/hebertialmeida/128.jpg"}]}
2020-02-05 22:08:37,710 INFO [protractor] error :: null
2020-02-05 22:08:37,711 INFO [protractor] response status is ::‘200
undefined

  API Get response
    √ returns API Get response
2020-02-05 22:08:38,854 INFO [protractor] body is :: {"name":"morpheus","job":"zion resident","id":"185","createdAt":"2020-02-05T16:38:38.812Z"}
2020-02-05 22:08:38,855 INFO [protractor] error :: null
2020-02-05 22:08:38,855 INFO [protractor] response status is :: 201
undefined
    √ returns POST response
2020-02-05 22:08:39,755 INFO [protractor] body is :: {"name":"morpheus","job":"zion resident","updatedAt":"2020-02-05T16:38:39.717Z"}
2020-02-05 22:08:39,756 INFO [protractor] error :: null
2020-02-05 22:08:39,756 INFO [protractor] response status is :: 200
undefined
    √ returns PUT response

Executed 3 of 3 specs SUCCESS.
[22:08:40] I/launcher - 0 instance(s) of WebDriver still running
[22:08:40] I/launcher - chrome #01 passed

> soapservices_typescript@1.0.0 allureGenerate C:\Users\arjun\git\RestServicesTesting_TypeScript
> allure generate allure-results -c

Report successfully generated to allure-report

> soapservices_typescript@1.0.0 allureOpen C:\Users\arjun\git\RestServicesTesting_TypeScript
> allure open allure-report
```
Allure reports:

<img src= "https://github.com/arjun436/RestServicesTesting_TypeScript/blob/master/image/3.png"/>
</p>
<img src= "https://github.com/arjun436/RestServicesTesting_TypeScript/blob/master/image/4.png"/>
</p>
<img src= "https://github.com/arjun436/RestServicesTesting_TypeScript/blob/master/image/5.png"/>
</p>


## Support

Reach out to me at one of the following places!

- FaceBook at <a href="https://www.facebook.com/chinna.mir.3" target="_blank">`arjun`</a>
- Twitter at <a href="https://twitter.com/arjun436" target="_blank">`@arjun436`</a>

---
