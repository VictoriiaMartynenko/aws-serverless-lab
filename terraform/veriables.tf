variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}

variable "namespace" {
  description = "Namespace for resource naming"
  type        = string
  default     = "cloudtech"
}

variable "stage" {
  description = "Environment stage"
  type        = string
  default     = "dev"
}
