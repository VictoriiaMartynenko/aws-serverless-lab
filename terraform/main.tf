module "courses_label" {
  source  = "cloudposse/label/null"
  version = "0.25.0"

  namespace = var.namespace
  stage     = var.stage
  name      = "courses"
}

module "authors_label" {
  source  = "cloudposse/label/null"
  version = "0.25.0"

  namespace = var.namespace
  stage     = var.stage
  name      = "authors"
}

module "courses_table" {
  source     = "./modules/dynamodb"
  table_name = module.courses_label.id
}

module "authors_table" {
  source     = "./modules/dynamodb"
  table_name = module.authors_label.id
}

# SNS topic
resource "aws_sns_topic" "alerts_topic" {
  name = "cloud-lab-alerts"
}

# Email subscription
resource "aws_sns_topic_subscription" "email_subscription" {
  topic_arn = aws_sns_topic.alerts_topic.arn
  protocol  = "email"
  endpoint  = var.email
}

# Lambda errors alarm
resource "aws_cloudwatch_metric_alarm" "lambda_errors" {
  alarm_name          = "lambda-errors-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1

  metric_name = "Errors"
  namespace   = "AWS/Lambda"
  period      = 60
  statistic   = "Sum"
  threshold   = 1

  alarm_actions = [aws_sns_topic.alerts_topic.arn]

  dimensions = {
    FunctionName = var.lambda_name
  }
}

# Billing alarm
resource "aws_cloudwatch_metric_alarm" "billing_alarm" {
  alarm_name          = "billing-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1

  metric_name = "EstimatedCharges"
  namespace   = "AWS/Billing"
  period      = 21600
  statistic   = "Maximum"
  threshold   = 5

  alarm_actions = [aws_sns_topic.alerts_topic.arn]

  dimensions = {
    Currency = "USD"
  }
}
