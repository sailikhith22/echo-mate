pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'sailikhith/node:latest'
        GIT_REPO = 'https://github.com/sailikhith22/echo-mate.git'
        K8S_DEPLOYMENT_FILE = 'deployment.yml'
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')  // Declare credentials globally
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git branch: 'main', url: "${GIT_REPO}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker Hub using globally declared credentials
                    sh "echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh "kubectl apply -f ${K8S_DEPLOYMENT_FILE}"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

