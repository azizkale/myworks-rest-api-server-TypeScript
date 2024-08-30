pipeline {
    agent {
        docker {
            image 'node:14-alpine'
        }
    }

    stages {      
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
                sh 'run.sh'
            }
        }
    }
}
