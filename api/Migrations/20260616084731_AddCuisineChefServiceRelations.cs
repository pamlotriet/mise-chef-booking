using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Starter.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCuisineChefServiceRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChefServices_Cuisine_CuisineId",
                table: "ChefServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cuisine",
                table: "Cuisine");

            migrationBuilder.RenameTable(
                name: "Cuisine",
                newName: "Cuisines");

            migrationBuilder.RenameColumn(
                name: "isActive",
                table: "Cuisines",
                newName: "IsActive");

            migrationBuilder.RenameIndex(
                name: "IX_Cuisine_Name",
                table: "Cuisines",
                newName: "IX_Cuisines_Name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cuisines",
                table: "Cuisines",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChefServices_Cuisines_CuisineId",
                table: "ChefServices",
                column: "CuisineId",
                principalTable: "Cuisines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChefServices_Cuisines_CuisineId",
                table: "ChefServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cuisines",
                table: "Cuisines");

            migrationBuilder.RenameTable(
                name: "Cuisines",
                newName: "Cuisine");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Cuisine",
                newName: "isActive");

            migrationBuilder.RenameIndex(
                name: "IX_Cuisines_Name",
                table: "Cuisine",
                newName: "IX_Cuisine_Name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cuisine",
                table: "Cuisine",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChefServices_Cuisine_CuisineId",
                table: "ChefServices",
                column: "CuisineId",
                principalTable: "Cuisine",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
