output "vpc_id" {
  value       = aws_vpc.default_vpc.id
  description = "The ID of the VPC"
}
