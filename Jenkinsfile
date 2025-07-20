pipeline {
  agent any
  environment {
    DOCKER_IMAGE = "my-web-app:${env.BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build Docker') {
      steps {
        script {
          dockerImage = docker.build(DOCKER_IMAGE)
        }
      }
    }
    stage('Smoke Test') {
      steps {
        script {
          docker.image(dockerImage.imageName()).inside {
            sh 'npm install'
            sh "npm start &"
            sleep 5
            sh 'npm run smoke'
          }
        }
      }
    }
    stage('Push Docker') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'U', passwordVariable: 'P')]) {
          script {
            docker.withRegistry('', 'dockerhub') {
              dockerImage.push('latest')
            }
          }
        }
      }
    }
    stage('Deploy to K8s') {
      steps {
        sh 'ansible-playbook deploy.yaml'
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}

