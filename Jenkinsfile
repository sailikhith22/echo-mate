pipeline {
    agent any  // Use any available agent

    environment {
        GIT_REPO = 'https://github.com/sailikhith22/echo-mate.git'
        IMAGE_NAME = 'node'  // Base name for your Docker image
        IMAGE_TAG = '18'  // Tag for your Docker image
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // Jenkins credentials ID for Docker Hub
        CONTAINER_NAME = 'SaigaduTHOPU'
        APP_PATH = '/home/echo-mate'
        TAGGED_IMAGE_NAME = 'jenkins:sai'  // New tagged image name
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
        stage('Tag Docker Image') {
            steps {
                script {
                    // Tag the built image with a new name
                    sh """
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${TAGGED_IMAGE_NAME}
                    """
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    // Push both images to Docker Hub using docker push directly
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                        echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}  // Push the original image
                        docker push ${TAGGED_IMAGE_NAME}  // Push the newly tagged image
                        """
                    }
                }
            }
        }
        stage('Run Container in Detached Mode') {
            steps {
                script {
                    // Run the container in detached mode
                    sh """
                    docker run -d --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}
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
            echo 'Pipeline failed!'
        }
    }
}

