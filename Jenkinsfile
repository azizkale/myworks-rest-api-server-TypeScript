pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    sh 'npm run test'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }
        stage('Start') {
            steps {
                script {
                    sh 'npm run start'
                }
            }
        }
    }
}
