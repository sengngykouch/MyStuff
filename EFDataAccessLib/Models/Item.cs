using System;
using System.ComponentModel.DataAnnotations;

namespace EFDataAccessLib.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(300)]
        public string Location { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [MaxLength(100)]
        public string Image { get; set; }

        public DateTime? ExpirationDate { get; set; }
    }
}