output "courses_table_name" {
  value = module.courses_table.table_name
}

output "courses_table_arn" {
  value = module.courses_table.table_arn
}

output "authors_table_name" {
  value = module.authors_table.table_name
}

output "authors_table_arn" {
  value = module.authors_table.table_arn
}
output "get_all_authors_lambda_name" {
  value = aws_lambda_function.get_all_authors.function_name
}

output "get_all_courses_lambda_name" {
  value = aws_lambda_function.get_all_courses.function_name
}

output "get_course_lambda_name" {
  value = aws_lambda_function.get_course.function_name
}

output "save_course_lambda_name" {
  value = aws_lambda_function.save_course.function_name
}

output "update_course_lambda_name" {
  value = aws_lambda_function.update_course.function_name
}

output "delete_course_lambda_name" {
  value = aws_lambda_function.delete_course.function_name
}

output "website_url" {
  value = aws_s3_bucket_website_configuration.frontend.website_endpoint
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.frontend.domain_name
}
