variable "region" {
  type        = string
  description = "The AWS region to deploy in"
  default     = "eu-central-1"
}

variable "vpc_cidr" {
  type        = string
  description = "The CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  type        = string
  description = "The CIDR block for the public subnet"
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  type        = string
  description = "The CIDR block for the private subnet"
  default     = "10.0.2.0/24"
}
