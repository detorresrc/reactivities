using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9]+$", ErrorMessage = "Username must be alphanumeric")]
        public string Username { get; set; }
    }
}