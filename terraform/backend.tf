terraform {
  backend "s3" {
    bucket         = "677008162265-terraform-tfstate"
    key            = "lab1/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-lock"
  }
}
