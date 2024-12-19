pipeline {
    agent any

    environment {
        DOCKER_IMAGE ='sailikhith/node:latest'  // Docker image name
        GIT_REPO = 'https://github.com/sailikhith22/echo-mate.git'  // Git repository URL
        K8S_DEPLOYMENT_FILE = 'deployment.yml'  // Kubernetes deployment file path
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')  // Declare credentials globally
        APP_PATH = '/home/echo-mate'  // Declare application path
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git branch: 'main', url: "${GIT_REPO}"  // Clone the Git repository
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Navigate to the application path before building
                    sh "cd ${APP_PATH} && docker build -t ${DOCKER_IMAGE} ."  // Build the Docker image
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker Hub using globally declared credentials
                    sh "echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}"  // Push the Docker image to Docker Hub
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Apply the Kubernetes deployment configuration using the application path
                    sh "kubectl apply -f ${K8S_DEPLOYMENT_FILE}"  // Deploy to Kubernetes
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'  // Success message
        }
        failure {
            echo 'Pipeline failed!'  // Failure message
        }
    }
}

