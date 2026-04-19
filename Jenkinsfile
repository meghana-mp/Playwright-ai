pipeline {
    agent any

    tools {
        // This MUST match the name you gave in 'Global Tool Configuration'
        nodejs 'NodeJS' 
        allure 'allure-cli'
        allurePlaywright 'allure-playwright'
    }

    stages {
        stage('Checkout') {
            steps {
                // This pulls your code from GitHub to the Jenkins workspace
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // 'npm ci' is better for CI than 'npm install' as it uses package-lock.json
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Jenkins needs this to download Chromium/Firefox/Webkit onto the Mac
                sh 'npx playwright install chromium firefox'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // The '|| true' ensures that even if tests fail, the pipeline 
                // doesn't stop, allowing the report to be generated.
                sh 'npx playwright test --project=chromium --reporter=line,allure-playwright || true'
            }
        }
    }

    post {
        always {
            // This publishes the report so you can see results in the Jenkins UI
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            // Stores the raw report files as artifacts
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            // 2. Allure Report Generation
            // 'results' path must match the folder where Playwright saves allure data (usually 'allure-results')
            allure includeProperties: false, 
                   jdk: '', 
                   results: [[path: 'allure-results']]

            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            // 3. Send the Email with the Report Attached
            emailext (
                subject: "Playwright Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """<h3>Playwright Test Results</h3>
                         <p>Status: <b>${currentBuild.currentResult}</b></p>
                         <p>View full report here: ${env.BUILD_URL}Playwright_20HTML_20Report</p>
                         <p>Console Logs: ${env.BUILD_URL}console</p>""",
                to: 'meghanamp.1990@gmail.com',
                attachmentsPattern: 'playwright-report/index.html', 
                attachLog: true,
                mimeType: 'text/html'
            )
        }
    }
}