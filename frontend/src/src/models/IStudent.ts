export interface ArticlesInterface {
	    
	ID : number,

	Name: string;

}

export interface Status_FamiliesInterface {
	    
	ID : number,

	Name: string;

}

export interface StudentsInterface {
    
	ID : number,

	id: number,

	Picture: string;

	First_Name: string;

	Last_Name: string;

	ID_Card: string;

	Email :string;

	Address: string;

	Province: string;

	ZipCode: string;

	PhoneNumber: string;

	CodeID: string;

	BirthYear:number;

	BirthMonth:string;

	BirthDay: number;
	
	Father_Name:  string;

	Father_Career:  string;

	Father_Phone:  string;

	Father_income:  number;

	Mother_Name:  string;

	Mother_Career:  string;

	Mother_Phone:  string;

	Mother_income:  number;

	Parent_Name:  string;

	Parent_Career:  string;

	Parent_Phone: string;

	Parent_About: string;

	StatusFamilyID:  number;

	StatusFamily:  Status_FamiliesInterface;

	ArticleID: number;
	Article:   ArticlesInterface;
	Family_income : number;

	Number_brother: number;
}