pipeline {
    agent any  // Use any available agent

    environment {
        IMAGE_NAME = "node:18"  // Base name for your Docker image
        IMAGE_TAG = "saigaduthopu"  // Tag for your Docker image
        K8S_DEPLOYMENT_FILE = "deployment.yml"  // Path to your Kubernetes deployment file
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins credentials ID for Docker Hub
        APP_PATH = '/home/echo-mate'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone your repository containing the Dockerfile and application code
                git 'https://github.com/sailikhith22/echo-mate.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image with a specific tag
                    def dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Push the built image to Docker Hub
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push("${IMAGE_TAG}")
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Deploy the application to Kubernetes using kubectl
                    sh """
                    kubectl apply -f ${K8S_DEPLOYMENT_FILE}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}

