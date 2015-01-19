<?php
class Database
{
	private function verify($table, $content)
	{
		foreach ($table as $field)
		{
			if (!isset($content[$field]))
			{
				die("Entry doesn't have field $field!");
				return false;
			}
		}

		return true;
	}

	public function __construct($root)
	{
		$this->root = $root;
		$this->schema = json_decode(file_get_contents("$root/schema.json"));

		foreach($this->schema->tables as $table=>$fields)
		{
			$dir = "$root/$table";

			if (!file_exists($dir))
			{
				mkdir("$root/$table");
				file_put_contents("$dir/id", "1");
			}

			if (!file_exists("$dir.blob"))
			{
				mkdir ("$dir.blob");
			}
		}
	}

	private function setNextId($table, $id)
	{
		file_put_contents("$this->root/$table/id", $id);
	}

	public function getNextId($table)
	{
		return file_get_contents("$this->root/$table/id");
	}

	public function pushFile($table, $content)
	{
		if (!$this->verify($this->schema->tables->$table, $content))
			return false;

		$id = $this->getNextId($table);
		$this->setNextId($table, $id+1);

		file_put_contents("$this->root/$table/$id", json_encode($content));

		return $id;
	}

	public function pushBlob($table, $blob, $content)
	{
		$id = $this->pushFile($table, $content);

		$blobDir = "$this->root/$table.blob";
		file_put_contents("$blobDir/$id", $blob);

		return $id;
	}

	public function getFile($table, $id)
	{
		$fileName = "$this->root/$table/$id";
		$file = json_decode(file_get_contents($fileName));
		$file->id = intval($id);

		return $file;
	}

	public function getFiles($table)
	{
		$files = scandir("$this->root/$table");

		$result = [];

		foreach ($files as $id)
		{
			if (!is_numeric($id))
				continue;

			$id = intval($id);

			$file = $this->getFile($table, $id);
			$result[$id] = $file;
		}

		return $result;
	}

	public function getBlob($table, $id)
	{
		$result = $this->getFile($table, $id);
		$fileName = "$this->root/$table.blob/$id";

		$result->content = file_get_contents($fileName);

		return $result;
	}

	public function getBlobs($table)
	{
		$files = $this->getFiles($table);

		foreach ($files as $file)
		{
			$fileName = "$this->root/$table.blob/$file";
			$file->content = file_get_contents($fileName);
		}

		return $files;
	}

	public function updateFile($table, $id, $content)
	{
		$fileName = "$this->root/$table/$id";
		$original = json_decode(file_get_contents($fileName));

		foreach($content as $key=>$val)
		{
			$original->$key = $val;
		}

		file_put_contents($fileName, json_encode($original));
	}

	public function deleteFile($table, $id)
	{
		unlink("$this->root/$table/$id");
	}

	public function deleteBlob($table, $id)
	{
		$this->deleteFile($table, $id);
		unlink("$this->root/$table/$id");
	}
}
