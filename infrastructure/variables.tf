variable "aws_region" {
  description = "AWS region where infrastructure will be created"
  type = string
  default = "ap-south-1"
}

variable "project_name" {
  description = "Name of the project"
  type = string
  default = "mern-blog-app"
}

variable "environment" {
  description = "Environment name"
  type = string
  default = "production"
}

variable "vpc_cidr" {
  description = "CIDR block for vpc"
  type = string
  default = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "instance_type" {
  description = "EC2 instance type for worker nodes"
  type        = string
  default     = "t3.medium"
}

variable "eks_cluster_version" {
  description = "Kubernetes version for EKS cluster"
  type        = string
  default     = "1.32"
}