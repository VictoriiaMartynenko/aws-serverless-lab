variable "table_name" {
  description = "DynamoDB table name"
  type        = string
}

variable "hash_key" {
  description = "Hash key name"
  type        = string
  default     = "id"
}
