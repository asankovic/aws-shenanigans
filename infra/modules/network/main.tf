resource "aws_vpc" "default_vpc" {
  cidr_block = var.vpc_cidr

  tags = {
    Name  = "default_vpc"
    Topic = "file_upload"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id     = aws_vpc.default_vpc.id
  cidr_block = var.public_subnet_cidr

  tags = {
    Name  = "public_subnet"
    Topic = "file_upload"
    Scope = "public"
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id     = aws_vpc.default_vpc.id
  cidr_block = var.private_subnet_cidr

  tags = {
    Name  = "private_subnet"
    Topic = "file_upload"
    Scope = "private"
  }
}

resource "aws_internet_gateway" "default_igw" {
  vpc_id = aws_vpc.default_vpc.id

  tags = {
    Name  = "default_igw"
    Topic = "file_upload"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.default_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.default_igw.id
  }

  tags = {
    Name  = "public_rt"
    Topic = "file_upload"
    Scope = "public"
  }
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.default_vpc.id

  tags = {
    Name  = "private_rt"
    Topic = "file_upload"
    Scope = "private"
  }
}

resource "aws_route_table_association" "public_rt_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "private_rt_association" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private_rt.id
}
