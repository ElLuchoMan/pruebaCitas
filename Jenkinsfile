pipeline {

    agent {
        label 'Slave_Induccion'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
        disableConcurrentBuilds()
    }

    tools {
        jdk 'JDK8_Centos'
        gradle 'Gradle4.5_Centos'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '------------>Checkout<------------'
                checkout([
                $class: 'GitSCM',
                branches: [[name: '*/main']],
                doGenerateSubmoduleConfigurations: false,
                extensions: [],
                gitTool: 'Default',
                submoduleCfg: [],
                userRemoteConfigs: [[
                    credentialsId: 'Github_marioruiz97',
                    url:'https://github.com/marioruiz97/ceiba-veterinaria-front.git'
                ]]
            ])
            }
        }

        stage('NPM Install') {
            steps {
                withEnv(['NPM_CONFIG_LOGLEVEL=warn']) {
                    sh 'npm install'
                }
            }
        }

        stage('Unit Test') {
            steps {
                sh 'ng test --browsers ChromeHeadless --progress=false --watch false --code-coverage'
            }
        }

        stage('Lint') {
            steps {
                sh 'ng lint'
            }
        }

        stage('Static Code Analysis') {
            steps{
                echo '------------>Análisis de código estático<------------'
                withSonarQubeEnv('Sonar') {
                    sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=sonar-project.properties"
                }
            }
        }

        stage('Build') {
            steps {
                sh 'ng build --prod --progress=false'
            }
        }
    }

    post {
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
            mail(to: 'mario.ruiz@ceiba.com.co', subject: "Failed Pipeline:${currentBuild.fullDisplayName}", body: "Something is wrong with ${env.BUILD_URL}")
        }
    }
}