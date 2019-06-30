pipeline {
    agent any

    stages {
    	stage('Configure Server URL') {
            steps {
                sh 'sed -i -e \'s#var baseUrl = "http://localhost:8080/Auslandssemesterportal";#var baseUrl = "http://10.3.15.45:8082/Auslandssemesterportal";#g\' src/main/webapp/WebContent/assets/js/app.js'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn install'
            }
        }
        stage('Build Docker') {
            steps {
                sh 'docker build -t mwi .'
            }
        }
        stage('Deploy Docker') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}