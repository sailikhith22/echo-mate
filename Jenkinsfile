pipeline {
    agent any  // Use any available agent

    environment {
        GIT_REPO = 'https://github.com/sailikhith22/echo-mate.git'  // Your Git repository
        IMAGE_NAME = 'sailikhith/jenkins'  // Replace with your Docker Hub username and repository name
        IMAGE_TAG = '18'  // Tag for your Docker image
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins credentials ID for Docker Hub
        APP_PATH = '/home/echo-mate'  // Path to your application directory
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
                    // Build the Docker image with a specific tag
                    sh """
                    cd ${APP_PATH}
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    """
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Push the built image to Docker Hub using docker push directly
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                        echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        """            
                    }
                }
            }
        }
        stage('Run Container in Detached Mode') {
            steps {
                script {
                    // Run the container in detached mode (optional)
                    sh """
                    docker run -d --name my-node-app ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
    }  
}
