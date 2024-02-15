import { db } from "@/firebase";
import { startTransition, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

type Category = {
  id: string;
  name: string;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    // Fetch categories from Firestore
    const fetchCategories = async () => {
      try {
        const snapshot = await db.collection("categories").get();
        const fetchedCategories: Category[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const docRef = await db
        .collection("categories")
        .add({ name: newCategory });
      const newCategoryItem: Category = { id: docRef.id, name: newCategory };
      setCategories((prevCategories) => [...prevCategories, newCategoryItem]);
      console.log("Category added successfully");
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category: Category) => (
            <SelectItem
              key={category.id}
              value={category.name}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddCategory}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
