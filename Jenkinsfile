pipeline {
    agent {
        docker {
            image 'node:14-alpine'
        }
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir() 
            }
        }
        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install' 
                }
            }
        }
        stage('Build TypeScript') {
            steps {
                script {
                    sh 'npm run build' 
                }
            }
        }

        stage('Set Executable Permission') {
            steps {
                sh 'chmod +x run.sh'
            }
        }
        stage('Deploy with Docker') {
            steps {
                sh './run.sh'
            }
        }
    }
}
