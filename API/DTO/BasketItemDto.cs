﻿using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class BasketItemDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        [Range(0.1,double.MaxValue, ErrorMessage = "This is out of valid price range")]
        public decimal Price { get; set; }
        [Required]
        [Range(1,int.MaxValue,ErrorMessage ="This is out of valid quantity range")]
        public int Quantity { get; set; }
        [Required]
        public string PictureUrl { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
